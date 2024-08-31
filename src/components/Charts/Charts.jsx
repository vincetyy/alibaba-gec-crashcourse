import React from 'react';
import './Charts.css';

const Charts = () => {
    return (
        <div className="charts">
            <div className="chart">
                <div className="chart-title">Compliant Products this month</div>
                <div className="chart-body">
                    {/* Insert circular chart or placeholder */}
                    <div className="chart-value">67%</div>
                </div>
            </div>
            <div className="chart">
                <div className="chart-title">Historical Compliance Rating</div>
                <div className="chart-body">
                    {/* Insert line chart or placeholder */}
                    <img src="line_chart_url" alt="line chart" />
                </div>
            </div>
            <div className="chart">
                <div className="chart-title">Successful International Listings</div>
                <div className="chart-body">
                    {/* Insert another line chart or placeholder */}
                    <img src="line_chart_url" alt="line chart" />
                </div>
            </div>
        </div>
    );
};

export default Charts;