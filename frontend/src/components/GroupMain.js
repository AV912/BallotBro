import './GroupMain.css';
import { Tabs, Tab } from '@nextui-org/react';
import Overview from './groupmain/Overview';
import Candidates from './groupmain/Candidates';
import WhoDoIVoteForModal from './groupmain/WhoDoIVoteForModal';
import TraitsForm from './groupmain/TraitsForm';

function GroupMain({ newAtGroup }) {
    return (
        <div id='group-main'>
            <div id='group-main-header'>
                <p className='font-bold text-inherit text-3xl'>Group X</p>
            </div>
            <div id='group-main-main'>
            {
            newAtGroup
            ? <TraitsForm className="flex w-full flex-col"
                questions={ ["What are you looking for in your leader in terms of technical knowledge?", "What are you looking for in your leader in terms of social prowess?"] } />
            : <div className="flex w-full flex-col">
                <Tabs variant='underlined' aria-label="Options">
                    <Tab key="overview" title="Overview" className='text-lg flex justify-center'>
                        <Overview
                            description={ "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sem turpis, efficitur et eros eu, dapibus pulvinar felis. Phasellus in ligula finibus, interdum arcu quis, facilisis ex. Mauris eget auctor odio. Etiam gravida ac risus in ultrices. Praesent at dictum lacus. Mauris quis nibh vel tortor vulputate auctor aliquet eu felis. Vivamus finibus lacinia elit, sit amet dignissim augue auctor ut. Vestibulum lobortis feugiat mi, vitae convallis ipsum dictum at. In hac habitasse platea dictumst." }
                            candidates={ [
                                {
                                    id: '1',
                                    full_name: "Name1 UserName1",
                                },
                                {
                                    id: '2',
                                    full_name: "Name2 UserName2",
                                },
                            ] } />
                    </Tab>
                    <Tab key="candidates" title="Candidates" className='text-lg flex justify-center'>
                        <Candidates
                            candidates={ [
                                {
                                    id: '1',
                                    full_name: "Name1 UserName1",
                                    intro: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sem turpis, efficitur et eros eu, dapibus pulvinar felis. Phasellus in ligula finibus, interdum arcu quis, facilisis ex. Mauris eget auctor odio",
                                    traits: ["A", "B", "C"],
                                },
                                {
                                    id: '2',
                                    full_name: "Name2 UserName2",
                                    intro: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sem turpis, efficitur et eros eu, dapibus pulvinar felis. Phasellus in ligula finibus, interdum arcu quis, facilisis ex. Mauris eget auctor odio",
                                    traits: ["C", "D", "E"],
                                },
                            ] } />
                        <WhoDoIVoteForModal />
                    </Tab>
                    {/* <Tab key="s" title="Q&A" className='text-lg flex justify-center'>
                        <QandA />
                    </Tab> */}
                    <Tab key="my_traits" title="My Traits" className='text-lg flex justify-center'>
                        <div id='traits-main'>
                            <p>Here are your Traits given in the group questionary.</p>
                            <ul className="list-disc ml-10">
                                { ["A", "B", "C", "E"].map(
                                    trait =>
                                    <li key={ trait }>{ trait }</li>
                                ) }
                            </ul>
                        </div>
                    </Tab>
                </Tabs>
                </div>
            }
            </div>
        </div>
    );
}

export default GroupMain;
