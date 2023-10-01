import './TraitsForm.css';
import { Input, Button } from '@nextui-org/react';

function TraitsForm({ questions }) {
    return (
        <div className='flex justify-center p-10'>
            <div id='traits-form-main' className='flex flex-col gap-5'>
                { questions.map(
                    (question, i) =>
                    <div className='mb-5'>
                        <h3 className="">{ question }</h3>
                        <Input
                            key={i}
                            type="text"
                            description={"Write keywords separated by a comma"}
                            variant='bordered'
                            />
                    </div>
                ) }
                <Button color="primary">
                    Join Group
                </Button>
            </div>
        </div>
    );
}

export default TraitsForm;
