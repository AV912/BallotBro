import './Candidates.css';
import { Accordion, AccordionItem, Button } from "@nextui-org/react";

function Candidates({ candidates }) {
    return (
        <>
        <div id='candidates-main'>
            <Accordion className='w-full'>
                { candidates.map(
                    candidate =>
                    <AccordionItem style={ {width: "844px"} } key={ candidate.id } aria-label={ candidate.full_name } title={ candidate.full_name }>
                        <p>{ candidate.intro }</p>
                        <p className='font-bold mt-5'>Traits</p>
                        <ul className="list-disc ml-10">
                            { candidate.traits.map(
                                trait =>
                                <li key={ trait }>{ trait }</li>
                            ) }
                        </ul>
                    </AccordionItem>
                ) }
            </Accordion>
        </div>
        </>
    );
}

export default Candidates;
