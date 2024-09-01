import TitleBar from '../../Bars/TitleBar/TitleBar';
import SideBar from '../../Bars/SideBar/SideBar';
import SearchTable from '../SearchTable/SearchTable';
import StatCards from '../StatCards/StatCards';
import AIAssistant from '../AIAssistant/AIAssistant';
import './DashboardHome.css';

const DashboardHome = () => {
    return (
        <div className="home-screen">
            <TitleBar />
            <div className="main-content">
                <SideBar />
                <div className="content-area">
                    <div className="left-section">
                        <SearchTable />
                    </div>
                    <div className="right-section">
                        <StatCards />
                        <AIAssistant />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardHome;