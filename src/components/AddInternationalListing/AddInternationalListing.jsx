import TitleBar from '../TitleBar/TitleBar';
import Sidebar from '../Sidebar/Sidebar';
import SearchTable from '../SearchTable/SearchTable';
import StatCards from '../StatCards/StatCards';
import AIAssistant from '../AIAssistant/AIAssistant';
import './AddInternationalListing.css'; // Optional: style your component

const AddInternationalListing = () => {
    return (
        <div className="home-screen">
            <TitleBar />
            <div className="main-content">
                <Sidebar />
                <div className="content-area-vertical">
                    <div className="top-section">
                       
                    </div>
                    <div className="bottom-section">
                    </div>
                </div>
            </div>
        </div>
    );
};


export default AddInternationalListing;