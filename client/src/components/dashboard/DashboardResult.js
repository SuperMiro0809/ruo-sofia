import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './DashboardResult.scss';
import { Box, Container, Grid, Hidden } from '@material-ui/core';
import DashboardCardLayout from './DashboardCardLayout';
import {
    faGlasses as GlassesIcon,
    faPrint as PrintIcon,
    faFileContract as FileContractIcon,
    faUsers as UsersIcon,
    faUserCog as UserCogIcon,
    faSignal as SignalIcon,
    faStar as StarIcon,
    faUserGraduate as UserGraduateIcon,
    faBookReader as BookReaderIcon,
    faCog as SettingsIcon,
    faUserFriends as CommitteIcon,
    faChartBar as ReferenceIcon,
    faBook as SubjectIcon,
    faBoxes
} from '@fortawesome/free-solid-svg-icons';
import dashboardServices from '../../services/dashboard';

const DashboardResult = () => {
    const navigate = useNavigate();
    const [values, setValues] = useState({ teachersCount: 0, protocolsCount: 0, studentsClassCount: 0, studentsSecondaryCount: 0, certificatesCount: 0, protocolsClassCount: 0 });

    useEffect(() => {
        dashboardServices.index()
        .then(data => {
            setValues(data);
        })
        .catch(err => {
            if (err.message === 'Unauthorized') {
                navigate('/login');
            }
        })
    }, [])

    return (
        // <Grid
        //     className="DashboardResult"
        //     spacing={3}
        //     container
        // >
        //     <Grid
        //         item
        //         lg={4}
        //         xs={12}
        //         className="dashboard-item"
        //     >
        //         <Grid
        //             container
        //             spacing={3}
        //             className="item-wrapper"
        //         >
        //             <Grid
        //                 item
        //                 lg={12}
        //                 sm={6}
        //                 xl={3}
        //                 xs={12}
        //                 className="item"
        //             >
        //                 <DashboardCardLayout
        //                     title="Учители"
        //                     value={values.teachersCount}
        //                     url="/app/teachers"
        //                     icon={GlassesIcon}
        //                 />
        //             </Grid>
        //             <Grid
        //                 item
        //                 lg={3}
        //                 sm={6}
        //                 xl={3}
        //                 xs={12}
        //                 className="item"
        //             >
        //                 <DashboardCardLayout
        //                     title="Протоколи"
        //                     value={values.protocolsCount}
        //                     url="/app/protocols"
        //                     icon={FileContractIcon}
        //                 />
        //             </Grid>
        //             <Grid
        //                 item
        //                 lg={3}
        //                 sm={6}
        //                 xl={3}
        //                 xs={12}
        //                 className="item"
        //             >
        //                 <DashboardCardLayout
        //                     title="Удостоверения"
        //                     value={values.certificatesCount}
        //                     url="/app/teachers/certificate"
        //                     icon={PrintIcon}
        //                 />
        //             </Grid>
        //         </Grid>
        //     </Grid>
        //     <Hidden lgDown>
        //         <Grid
        //             item
        //             lg={4}
        //             xs={12}
        //             className="dashboard-item"
        //             sx={{
        //                 display: { small: 'none' }
        //             }}
        //         >
        //             <img
        //                 alt="Logo"
        //                 src="/static/ruo.png"
        //                 width="300px"
        //             />
        //         </Grid>
        //     </Hidden>
        //     <Grid
        //         item
        //         lg={4}
        //         xs={12}
        //         className="dashboard-item"
        //     >
        //         <Grid
        //             container
        //             spacing={3}
        //             className="item-wrapper"
        //         >
        //             <Grid
        //                 item
        //                 lg={12}
        //                 sm={6}
        //                 xl={3}
        //                 xs={12}
        //                 className="item"
        //             >
        //                 <DashboardCardLayout
        //                     title="Ученици - Клас"
        //                     value={values.studentsClassCount}
        //                     url="/app/students-class"
        //                     icon={UserGraduateIcon}
        //                 />
        //             </Grid>
        //             <Grid
        //                 item
        //                 lg={3}
        //                 sm={6}
        //                 xl={3}
        //                 xs={12}
        //                 className="item"
        //             >
        //                 <DashboardCardLayout
        //                     title="Ученици - Средно"
        //                     value={values.studentsSecondaryCount}
        //                     url="/app/students-secondary"
        //                     icon={UserGraduateIcon}
        //                 />
        //             </Grid>
        //         </Grid>
        //     </Grid>
        // </Grid>

        <Box className="DashboardResult">
            <Box className="dashboard-item">
                <Grid
                    container
                    spacing={3}
                    className="item-wrapper"
                >
                    <Grid
                        item
                        lg={4}
                        sm={6}
                        xl={4}
                        xs={12}
                        className="item"
                    >
                        <DashboardCardLayout
                            title="Учители"
                            value={values.teachersCount}
                            url="/app/teachers"
                            icon={GlassesIcon}
                        />
                    </Grid>
                    <Grid
                        item
                        lg={4}
                        sm={6}
                        xl={4}
                        xs={12}
                        className="item"
                    >
                        <DashboardCardLayout
                            title="Протоколи"
                            value={values.protocolsCount}
                            url="/app/protocols"
                            icon={FileContractIcon}
                        />
                    </Grid>
                    <Grid
                        item
                        lg={4}
                        sm={6}
                        xl={4}
                        xs={12}
                        className="item"
                    >
                        <DashboardCardLayout
                            title="Удостоверения"
                            value={values.certificatesCount}
                            url="/app/teachers/certificate"
                            icon={PrintIcon}
                        />
                    </Grid>
                </Grid>
            </Box>
            <Box className="dashboard-item">
                <img
                    alt="Logo"
                    src="/static/ruo.png"
                    width="300px"
                />
            </Box>
            <Box className="dashboard-item">
                <Grid
                    container
                    spacing={3}
                    className="item-wrapper"
                >
                    <Grid
                        item
                        lg={4}
                        sm={6}
                        xl={4}
                        xs={12}
                        className="item"
                    >
                        <DashboardCardLayout
                            title="Ученици - Клас"
                            value={values.studentsClassCount}
                            url="/app/students-class"
                            icon={UserGraduateIcon}
                        />
                    </Grid>
                    <Grid
                        item
                        lg={4}
                        sm={6}
                        xl={4}
                        xs={12}
                        className="item"
                    >
                        <DashboardCardLayout
                            title="Ученици - Средно"
                            value={values.studentsSecondaryCount}
                            url="/app/students-secondary"
                            icon={UserGraduateIcon}
                        />
                    </Grid>
                    <Grid
                        item
                        lg={4}
                        sm={6}
                        xl={4}
                        xs={12}
                        className="item"
                    >
                        <DashboardCardLayout
                            title="Протоколи - Клас"
                            value={values.protocolsClassCount}
                            url="/app/students-secondary"
                            icon={FileContractIcon}
                        />
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}



export default DashboardResult;