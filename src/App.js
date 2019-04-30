import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ReactTable from "react-table";
import 'react-table/react-table.css';

class App extends Component {

  constructor(props){
      super(props);
      this.state={
            a:[],
            j:[],
            k:[],
            datas:[],
            check :0,
            total:0,
            ka:0,
            kj:0,
            ja:0,
            jk:0,
            aj:0,
            ak:0,
            act:0,
            contribution:0,
            totalkartik:0,
            totaljeemon:0,
            totalajay:0
      }
  }

    submit = () => {
    var datas = this.state.datas;
    var a = parseInt(document.getElementById('a').value);
    isNaN(a) ? a=0 :this.state.a.push(a);
      console.log('aa',this.state.a);
    var j = parseInt(document.getElementById('j').value);
        isNaN(j) ? j=0 :this.state.j.push(j);
        console.log('jj',this.state.j);
    var k = parseInt(document.getElementById('k').value);
        isNaN(k) ? k=0 :this.state.k.push(k);
      this.state.k.push(k);
       
        if (this.state.act === 0) {
            var data = {
                k, j, a
            }
            datas.push(data);
        }
        else {
            let index = this.state.index;
            datas[index].j=j;
            datas[index].a=a;
            datas[index].k=k;
        }
      this.setState({datas:datas})
      console.log('ssss',this.state.datas);
      console.log(k,j,a);
    }

    edit = (i) => {
      let data = this.state.datas[i];
      this.refs.j.value = data.j;
      this.refs.a.value = data.a;
      this.refs.k.value = data.k;

      this.setState({
          act: 1,
          index: i
      });

      this.refs.j.focus();
    }
    delete = (i) => {
       var datas = this.state.datas;
       datas.splice(i,1);
       this.setState({datas:datas});
       console.log(this.state.datas);
    }

    calc = () => {

        //state set zero for the edit and delete to show after operation.

        this.state.kj = 0;
        this.state.ka = 0;
        this.state.ja = 0;
        this.state.jk = 0;
        this.state.aj = 0;
        this.state.ak = 0;

        var flag;
        var response = this.state.datas;
        console.log('respone',response);
        var a=0,j=0,k=0;
        function geta(item,index) {
            var aa = parseInt([item.a]);
            a= aa+a;
            return a;
        }
        response.map(geta);
        this.setState({totalajay:a})
        console.log('ara',a);
        function getj(item,index) {
            var jj = parseInt([item.j]);
            j=jj+j;
        }
        response.map(getj);
        this.setState({totaljeemon:j})
        function getk(item,index) {
            var kk = parseInt([item.k]);
            k=k+kk;
        }
        response.map(getk);
        this.setState({totalkartik:k})
        var givea = -1;
        var givek = -1;
        var givej = -1;

        var total = a+j+k;
        this.setState({total:total});
        console.log('too',this.state.total);

        var cont = total/3;
        this.setState({contribution:cont});
        console.log('jj',typeof(k-cont));
        if ((a-cont)>0) {
            givea = a-cont;
        }
        if ((j-cont)>0) {
            givej = j-cont;
            console.log('aa',cont);
        }
        if ((k-cont)>0) {
            console.log('comess');
            givek = k-cont;
        }
        console.log('k',givek,'a',givea,'j',givej);
        //Code for distribution calculation

        if (givea > 0){
            this.setState({check:1});
            if (givek < 0) {
                var ka = cont - k;
                this.setState({ka:ka});
            }
            if (givej < 0) {
                var ja = cont - j;
                this.setState({ja:ja});
            }
        }
        if (givek > 0){
            this.setState({check:1});
            if (givea < 0) {
                var ak = cont - a;
                this.setState({ak:ak});
            }
            if (givej < 0) {
                var jk = cont - j;
                this.setState({jk:jk});
            }
        }
        if (givej > 0){
            console.log('givej',givej);
            this.setState({check:1});
            if (givea < 0) {
                var aj = cont - a;
                console.log('aj',aj);
                this.setState({aj:aj});
            }
            if (givek < 0) {
                var kj = cont - k;
                console.log('kj',kj);
                this.setState({kj:kj});
            }
        }
        console.log('tots',total);
    }

  render() {

    var datas = this.state.datas;
    var tots = this.state.total;
    var kj =this.state.kj;
    var ka =this.state.ka;
    var ja =this.state.ja;
    var jk =this.state.jk;
    var aj =this.state.aj;
    var ak =this.state.ak;
    var contribution = this.state.contribution;
    var kartik = this.state.totalkartik;
    var jeemon  = this.state.totaljeemon;
    var ajay = this.state.totalajay;

    return (
      <div className="App">
          <div className="form">
                <h1>Revenue Management</h1><hr/>
                <label>Jeemon : </label><input type={'number'} placeholder='Amount' id='j' ref="j"/>
                <label>Ajay : </label><input type={'number'} placeholder='Amount' id='a' ref="a"/>
                <label>Kartik : </label><input type={'number'} placeholder='Amount' id='k' ref="k"/>
          </div>

            <button onClick={() => this.submit()} className="button">Submit</button>
            <button onClick={() => this.calc()} className="button">Calculate</button>
        <pre>
            {datas.map((data,i) =>
                <li key={i}>
                    {data.j},{data.a},{data.k}
                    <button className={"listbtn"} onClick={() => this.edit(i)}>edit</button>
                    <button className={"listbtn"} onClick={() => this.delete(i)}>remove</button>
                </li>

            )}
            <ReactTable
                data={datas}
                    columns={[
                    {
                        Header: "Jeemon",
                        accessor: 'j'
                    },
                    {
                        Header: "Ajay",
                        accessor: 'a'
                    },
                    {
                        Header: "Kartik",
                        accessor: 'k'
                    },
                    {
                        Header: "Actions",
                        Cell: row => (
                            <div>
                                <button className={"listbtn"} onClick={() => this.edit()}>edit</button>
                                <button className={"listbtn"} onClick={() => this.delete()}>remove</button>
                            </div>
                        )
                    }
            ]}
        />
        </pre>
          {this.state.check == 1 &&

          <h3>Total Spent :{tots} || Per Person Contribution : {contribution} <br/>Kartik :{kartik}, Jeemon :{jeemon}, Ajay: {ajay}</h3>

          }

              {kj > 0 && kj != undefined &&
                  <h4>Kartik->Jeemon = {kj}</h4>
              }

              {ka > 0 && ka != undefined &&
                  <h4>Kartik->Ajay = {this.state.ka}</h4>
              }

              {aj > 0 && aj != undefined &&
                  <h4>Ajay->Jeemon = {this.state.aj}</h4>
              }

              {ak > 0 && ak != undefined &&
                  <h4>Ajay->Kartik = {this.state.ak}</h4>
              }

              {ja > 0 && ja != undefined &&
                  <h4>Jeemon->Ajay = {this.state.ja}</h4>
              }

              {jk > 0 && jk != undefined &&
                  <h4>Jeemon->Kartik = {this.state.jk}</h4>
              }
      </div>
    );
  }
}

export default App;
