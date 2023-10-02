import './NewGroupModal.css';
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Accordion, AccordionItem, Textarea } from "@nextui-org/react";
import axios from 'axios';
import { BiLockAlt } from 'react-icons/bi';

function NewGroupModal({ isOpen, onOpenChange }) {

    const url = 'http://localhost:3000/';

    async function createGroup() {
        const data = {
            title: document.getElementById('title').value,
            description: document.getElementById('description').value,
            candidates: document.getElementById('candidates').value.split(','),
            guidingQuestions: document.getElementById('guiding-questions').value.split(','),
        };

        console.log(data);

        axios({
            method: 'post',
            url: url + 'groups',
            data,
            headers: {
                'access-token': localStorage.getItem('access-token'),
            }
        }).then(res => {
            console.log(res);
        }).catch(err => {
            console.error(err);
        });
    }
    
    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            placement="top-center"
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">Join Group</ModalHeader>
                        <ModalBody>
                            <Input
                                autoFocus
                                endContent={
                                    <BiLockAlt className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                }
                                label="Code"
                                placeholder="Enter the code"
                                variant="bordered"
                            />
                        </ModalBody>
                        <ModalBody>
                            <Accordion>
                                <AccordionItem aria-label="Create Group" title="Create Group" className='font-semibold'>
                                <div className=''>
                                    <h3 className="">Title:</h3>
                                    <Input
                                        id='title'
                                        placeholder="Enter the title"
                                        variant="bordered"
                                    />
                                    <h3 className="mt-3">Description:</h3>
                                    <Textarea 
                                        id='description'
                                        placeholder='Enter the description'
                                        variant='bordered'
                                        />
                                    <h3 className="mt-3">Candidates:</h3>
                                    <Textarea 
                                        id='candidates'
                                        description={"Write the questions separated by a comma"}
                                        variant='bordered'
                                        />
                                    <h3 className="mt-3">Guiding Questions:</h3>
                                    <Textarea 
                                        id='guiding-questions'
                                        description={"Write the questions separated by a comma"}
                                        variant='bordered'
                                        />
                                </div>
                                </AccordionItem>
                            </Accordion>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="flat" onClick={onClose}>
                                Close
                            </Button>
                            <Button color="primary" onClick={createGroup}>
                                Submit
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}

export default NewGroupModal;
