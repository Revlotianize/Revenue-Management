import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

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
          contribution:0
      }
  }

    submit = () => {
    var datas = this.state.datas;
    var a = parseInt(document.getElementById('a').value);
      this.state.a.push(a);
      console.log('aa',this.state.a);
    var j = parseInt(document.getElementById('j').value);
        this.state.j.push(j)
        console.log('jj',this.state.j);
    var k = parseInt(document.getElementById('k').value);
      this.state.k.push(k);
        console.log('kk',this.state.k);
        
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
        console.log('ara',a);
        function getj(item,index) {
            var jj = parseInt([item.j]);
            j=jj+j;
        }
        response.map(getj);
        function getk(item,index) {
            var kk = parseInt([item.k]);
            k=k+kk;
        }
        response.map(getk);
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

    return (
      <div className="App">
        <h1>Revenue Management</h1><hr/>
            <label>Jeemon : </label><input type={'number'} placeholder='Jeemon' id='j' ref="j"/>
            <label>Ajay : </label><input type={'number'} placeholder='Ajay' id='a' ref="a"/>
            <label>Kartik : </label><input type={'number'} placeholder='Kartik' id='k' ref="k"/>

            <button onClick={() => this.submit()}>Submit</button>
            <button onClick={() => this.calc()}>Calculate</button>
        <pre>
            {datas.map((data,i) =>
                <li key={i}>
                    {data.j},{data.a},{data.k}
                    <button onClick={() => this.edit(i)}>edit</button>
                    <button onClick={() => this.delete(i)}>remove</button>
                </li>
            )}
        </pre>
          {this.state.check == 1 &&

          <h2>Total Spent :{tots} || Per Person Contribution : {contribution}</h2>
          }

              {kj > 0 && kj != undefined &&
                  <h3>Kartik->Jeemon = {kj}</h3>
              }

              {ka > 0 && ka != undefined &&
                  <h3>Kartik->Ajay = {this.state.ka}</h3>
              }

              {aj > 0 && aj != undefined &&
                  <h3>Ajay->Jeemon = {this.state.aj}</h3>
              }

              {ak > 0 && ak != undefined &&
                  <h3>Ajay->Kartik = {this.state.ak}</h3>
              }

              {ja > 0 && ja != undefined &&
                  <h3>Jeemon->Ajay = {this.state.ja}</h3>
              }

              {jk > 0 && jk != undefined &&
                  <h3>Jeemon->Kartik = {this.state.jk}</h3>
              }
      </div>
    );
  }
}

export default App;
