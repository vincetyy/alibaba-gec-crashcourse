import TitleBar from '../../Bars/TitleBar/TitleBar';
import Sidebar from '../../Bars/SideBar/Sidebar';
import ProductDetails from '../ProductDetails/ProductDetails';
import ProductAnalysis from '../ProductAnalysis/ProductAnalysis';
import CountryFilter from '../CountryFilter/CountryFilter';
import SelectedCountries from '../SelectedCountries/SelectedCountries';
import WorldMap from '../WorldMap/WorldMap';
import './AddListingHome.css'; // Optional: style your component

const AddListingHome = () => {
    return (
        <div className="home-screen">
            <TitleBar />
            <div className="main-content">
                <Sidebar />
                <div className="content-area-vertical">
                    <div className="top-section">
                        <ProductDetails />
                        <ProductAnalysis />
                    </div>
                    <div className="bottom-section">
                    <CountryFilter />
                    <SelectedCountries />
                    <WorldMap />
                    </div>
                </div>
            </div>
        </div>
    );
};


export default AddListingHome;