import Layout from "../components/Layout";
import Dashboards from "../components/dashboards/Dashboards";
import ClientOnly from "../components/ClientOnly";

const DashboardsPage = () => {
    return (
        <ClientOnly>
            <Layout>
                <Dashboards/>
            </Layout>
        </ClientOnly>
    );
}
export default DashboardsPage;
