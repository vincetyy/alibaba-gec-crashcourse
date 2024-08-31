import TitleBar from '../TitleBar/TitleBar';
import Sidebar from '../Sidebar/Sidebar';
import SearchTable from '../SearchTable/SearchTable';
import StatCards from '../StatCards/StatCards';
import AIAssistant from '../AIAssistant/AIAssistant';
import './Dashboard.css';

const Dashboard = () => {
    return (
        <div className="home-screen">
            <TitleBar />
            <div className="main-content">
                <Sidebar />
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

export default Dashboard;