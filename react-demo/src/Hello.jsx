import React, { Component, PureComponent, createRef} from 'react'
// import { createRef } from 'react/cjs/react.production.min';

export default class Hello extends PureComponent {
  constructor(props){
    super(props);
    console.log('props',this)
    this.state = {
      count:1
    }
    this.ref = createRef();
    // this.handleClick.bind(this)
  }
  handleClick = ()=> {
    // setTimeout(()=>{// 不再react控制中setState同步更新
      this.setState({
        count: 2
      })
      console.log(this.state.count)
      this.setState({
        count: 3
      })
      console.log(this.state.count)

      this.setState({
        count: 4
      })
      console.log(this.state.count)

    // },0)
  }
  componentDidMount(){
    // this.ref.current.addEventListener('click',()=>{
    //   console.log('-----')
    //   this.setState({
    //     count: 2
    //   })

    //   this.setState({
    //     count: 3
    //   })
    // })
  }
  render() {
  console.log('-----render')
    const {count} = this.state;
    return (
      <>
      
      <div onClick={this.handleClick}>Hell{count}
      </div>
      {/* <button id="steve" ref={this.ref}>buton</button> */}

      </>
    )
  }
}
