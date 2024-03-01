import { useNavigate, useParams } from "react-router-dom";
import { Store } from "../stores/store";
import { useEffect } from "react";
import SideBar from "../components/SideBar";
import GroupHomeScreen from "../components/GroupHomeScreen";

const DynamicgroupPage = () => {
    const { groupId } = useParams<{ groupId?: string }>(); // Extract the groupId from the URL
    // const [groupData, setGroupData] = useState<GroupDocument | null>(null); // State to hold the fetched group data
    const navigate = useNavigate();
    const store = Store();
    useEffect(() => {
        async function getUserData() {
            await store.getUserData(navigate);
            if (groupId) {
                await store.handleFetchselectedGroups(groupId);
            }
        }

        getUserData();
    }, []);

    console.log(store.selectedgroup);

    return (
        <div className="MainPage">
            <div className="GroupHomePageSideBar">
                <SideBar />
            </div>

            <div className="mainScreen">
                <GroupHomeScreen />
            </div>
        </div>
    );
};

export default DynamicgroupPage;
