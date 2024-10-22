import Counter from "../../components/Counter/Counter";
import Timer from "../../components/Timer/Timer";
import Add from "../../components/Add/Add";
import Temperature from "../../components/Temperature/Temperature";
import './components.css'

function Components() {
    return ( <div className="components-container">
    {/* <h1>COMPONENTS</h1> */}
    <div className="App">
      <center><h2 className="TitleName">REACT COMPONENTS</h2></center>
    <div className="container">
      <div className="box-topLeft">
        <Counter />
        <Timer />
      </div>

      <div className="box-topRight">
        <Add aValue={0} bValue={0} />
      </div>
      
      <div className="box-bottom">
        <Temperature />
      </div>
      
    </div>
    <center><h2 className="TitleName">นายยศยุต ฤธาทิพย์ รหัส 66033872</h2></center>
    </div>
        </div>
     );
}

export default Components;