import { Component } from "react"

function Hoc(Cmp){
  // do something 
  return class extends Component{
    render(){
      return (
        <Cmp />
      )
    }
  }
  
}
export { Hoc}