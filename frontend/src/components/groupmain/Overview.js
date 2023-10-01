import './Overview.css';

function Overview({ description, candidates }) {
    return (
        <div id='overview-main'>
            <div className='mb-10'>
                <p className='font-bold'>Description</p>
                <p>{ description }</p>
            </div>
            <div>
                <p className='font-bold'>Candidates</p>
                <ul className="list-disc ml-10">
                    { candidates.map(
                        candidate =>
                        <li key={ candidate.id }>{ candidate.full_name }</li>
                    ) }
                </ul>
            </div>
        </div>
    );
}

export default Overview;
