import './Home.css';

function Home() {
    return ( 
        <div className='home-container-border'>
            {/* <h1>HOME</h1> */}
        <div className='home-container'>
            <div className="resume-card">
                <img src="src/assets/Yossayut.png" alt="yossayutImage" className='Yossayut-img'/>
                <h1 className="name">นาย ยศยุต ฤธาทิพย์</h1>
                <h2 className="student-id">66033872</h2>
                <p>อายุ : 19 ปี</p>
                <p className="description">
                    นักศึกษามหาวิทยาลัยศรีประทุม คณะเทคโนโลยีสารสนเทศ สาขา วิทยาการคอมพิวเตอร์และนวัตกรรมการพัฒนาซอฟต์แวร์ 
                </p>
            </div>
        </div>
        </div>
    );
}

export default Home;
