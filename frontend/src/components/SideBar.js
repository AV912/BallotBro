import { Button, useDisclosure } from '@nextui-org/react';
import './SideBar.css';
import { BiMenu, BiPlus } from 'react-icons/bi';
import GroupList from './sidebar/GroupList';
import NewGroupModal from './sidebar/NewGroupModal';
import { useEffect, useState } from 'react';
import axios from 'axios';

function SideBar() {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    const [groups, setGroups] = useState([]);

    const url = 'http://localhost:3000/';

    useEffect(() => {
        async function getGroups() {
            axios({
                method: 'get',
                url: url + 'user/groups',
                headers: {
                    'access-token': localStorage.getItem('access-token'),
                }
            }).then(res => {
                console.log(res);
                setGroups(res.data);
            }).catch(err => {
                console.error(err);
            });
        }
        getGroups();
    }, []);

    return (
        <div id='sidebar'>
            <div id='sidebar-header'>
                <BiMenu className='icon-30' />
                <p className="font-bold text-inherit text-2xl">BallotBro</p>
                <Button isIconOnly color="primary" aria-label="Like" onPress={onOpen}>
                    <BiPlus className='icon-24'/>
                </Button>
                <NewGroupModal 
                    isOpen={isOpen}
                    onOpenChange={onOpenChange}/>
            </div>
            <div id='sidebar-main'>
                <GroupList
                    title={"Open Groups"}
                    groups={groups} />

                <GroupList
                    title={"Closed Groups"}
                    groups={groups} />
            </div>
        </div>
    );
}

export default SideBar;