const router = require('express').Router();
const {createGroup, getGroup, deleteGroup, addCandidate, removeCandidate, addMember, removeMember, 
    getGroups, getGroupCandidates, getGroupMembers, joinGroup, gainInsights} = require('./../controllers/group.controller');
const {verifyToken, isLoggedIn} = require('./../controllers/auth.controller');
const validateFields = require('./../controllers/validation.controller');

// Basic DB operations
router.post('/groups', verifyToken, createGroup);
router.get('/groups', verifyToken, getGroup);
router.delete('/groups', verifyToken, deleteGroup);

// Requirements functions
router.post('/group/candidate', verifyToken, addCandidate);
router.delete('/group/candidate', verifyToken, removeCandidate);
router.post('/group/member', verifyToken, addMember);
router.delete('/group/member', verifyToken, removeMember);
router.get('/user/groups', verifyToken, getGroups);
router.post('/groups/join', verifyToken, joinGroup);
router.post('/user/group/insights', verifyToken, gainInsights);

module.exports = router;