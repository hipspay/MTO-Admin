import React, { useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import Grid from '@material-ui/core/Grid';
import { useSelector } from 'react-redux';
import Layout from '../../components/Layout';
// import { getStats } from '../../apis/admin.api';
import './style.scss';

// import Spinner from '../../components/Common/Spinner';

const Home = () => {
    const [stats, setStats] = React.useState({
        merchants: 0,
        orders: 0,
        disputes: 0,
        products: 0,
    });
    const bkdDriver = useSelector((state) => state.driverObject.bkdDriver);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!bkdDriver || !bkdDriver.headers) {
                    return;
                }
                const data = await bkdDriver.getStats();
                setStats(data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [bkdDriver]);

    const areaData = {
        labels: ['2013', '2014', '2015', '2016', '2017'],
        datasets: [
            {
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
                fill: true, // 3: no fill
            },
        ],
    };

    const areaOptions = {
        plugins: {
            filler: {
                propagate: true,
            },
        },
        scales: {
            yAxes: [
                {
                    gridLines: {
                        color: 'rgba(204, 204, 204,0.1)',
                    },
                },
            ],
            xAxes: [
                {
                    gridLines: {
                        color: 'rgba(204, 204, 204,0.1)',
                    },
                },
            ],
        },
    };

    return (
        <Layout title="Home">
            <div className="home__container">
                <div className="top__container">
                    <Grid container>
                        <Grid item xs={3} className="d-flex-center flex-column">
                            <p>Merchants</p>
                            <div className="board d-flex-center">
                                <p>{stats.merchants}</p>
                            </div>
                        </Grid>
                        <Grid item xs={3} className="d-flex-center flex-column">
                            <p>Products</p>
                            <div className="board d-flex-center">
                                <p>{stats.products}</p>
                            </div>
                        </Grid>
                        <Grid item xs={3} className="d-flex-center flex-column">
                            <p>Transactions</p>
                            <div className="board d-flex-center">
                                <p>{stats.orders}</p>
                            </div>
                        </Grid>
                        <Grid item xs={3} className="d-flex-center flex-column">
                            <p>Disputes</p>
                            <div className="board d-flex-center">
                                <p>{stats.disputes}</p>
                            </div>
                        </Grid>
                    </Grid>
                </div>
                <div className="body__container">
                    <div className="d-flex-center">
                        <Line
                            data={areaData}
                            className="chart"
                            options={areaOptions}
                        />
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Home;
