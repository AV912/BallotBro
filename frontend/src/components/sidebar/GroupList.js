import { Card, CardBody } from '@nextui-org/react';
import './GroupList.css';

function GroupList({ title, groups }) {
    return (
        <div className='group-list-main'>
            <p className='group-list-title font-bold text-inherit text-2xl'>{ title }</p>
            <div className='group-list-list'>
                { groups.map(
                    group => 
                    <Card key={ group.id } className='cursor-pointer'>
                        <CardBody>
                            <p>{ group.title }</p>
                        </CardBody>
                    </Card>
                ) }
            </div>
        </div>
    );
}

export default GroupList;
