const Group = require('./../models/group.model');
const User = require('./../models/user.model');
const socketController = require('./../socket/socket.controller');
const {v4} = require('uuid');


//basic DB functions
const createGroup = async (req, res) => {
    try {
        let {title, description, guidingQuestions, candidates} = req.body;

        const group = new Group({
            title,
            description,
            accessCode: v4(),
            organizerId: req.user_id,
            members: [req.username],
            candidates: candidates,
            guidingQuestions,
            status: 'open'
        });

        await group.save();

        const user = await User.findById(req.user_id);
        user.groups.push({
            group_id: group._id,
            traits: [], 
            role: 'organizer'
        });
        await user.save();

        res.json(group);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const getGroup = async (req, res) => {
    try {
        const group = await Group.findById(req.params.id);

        // If group doesn't exist
        if (!group) return res.status(404).json({message: "Group doesn't exist."});
        
        return res.json(group);
    } catch (error) {
        res.status(500).json({message: error});
    }
};

const deleteGroup = async (req, res) => {
    try {
        const group = await Group.findByIdAndDelete(req.params.id);

        // If group doesn't exist
        if (!group) return res.status(404).json({message: "Group doesn't exist."});
        
        return res.json(group);
    } catch (error) {
        res.status(500).json({message: error});
    }
};


//requirement functions

const addCandidate = async (req, res) => {
    try {
        const group = await Group.findById(req.params.id);

        // If group doesn't exist
        if (!group) return res.status(404).json({message: "Group doesn't exist."});

        const user = await User.findById(req.body.candidate_id);

        // If user doesn't exist
        if (!user) return res.status(404).json({message: "User doesn't exist."});

        // If user is already a candidate
        if (group.candidates.includes(req.body.candidate_id)) return res.status(404).json({message: "User is already a candidate."});

        group.candidates.push(req.body.candidate_id);
        await group.save();

        res.json(group);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const removeCandidate = async (req, res) => {
    try {
        const group = await Group.findById(req.params.id);

        // If group doesn't exist
        if (!group) return res.status(404).json({message: "Group doesn't exist."});

        const user = await User.findById(req.body.candidate_id);

        // If user doesn't exist
        if (!user) return res.status(404).json({message: "User doesn't exist."});

        // If user is not a candidate
        if (!group.candidates.includes(req.body.candidate_id)) return res.status(404).json({message: "User is not a candidate."});

        group.candidates = group.candidates.filter(candidate => candidate != req.body.candidate_id);
        await group.save();

        res.json(group);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const addMember = async (req, res) => {
    try {
        const group = await Group.findById(req.params.id);

        // If group doesn't exist
        if (!group) return res.status(404).json({message: "Group doesn't exist."});

        const user = await User.findById(req.body.member_id);

        // If user doesn't exist
        if (!user) return res.status(404).json({message: "User doesn't exist."});

        // If user is already a member
        if (group.members.includes(req.body.member_id)) return res.status(404).json({message: "User is already a member."});

        group.members.push(req.body.member_id);
        await group.save();

        res.json(group);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const removeMember = async (req, res) => {
    try {
        const group = await Group.findById(req.params.id);

        // If group doesn't exist
        if (!group) return res.status(404).json({message: "Group doesn't exist."});

        const user = await User.findById(req.body.member_id);

        // If user doesn't exist
        if (!user) return res.status(404).json({message: "User doesn't exist."});

        // If user is not a member
        if (!group.members.includes(req.body.member_id)) return res.status(404).json({message: "User is not a member."});

        group.members = group.members.filter(member => member != req.body.member_id);
        await group.save();

        res.json(group);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};


const getGroups = async (req, res) => {
    try {
        const groups = await User.findById(req.user_id).groups;

        return res.json(groups);
    } catch (error) {
        res.status(500).json({message: error});
    }
};

const getGroupCandidates = async (req, res) => {
    try {
        const group = await Group.findById(req.params.id);

        // If group doesn't exist
        if (!group) return res.status(404).json({message: "Group doesn't exist."});

        const candidates = await User.find({_id: {$in: group.candidates}});

        return res.json(candidates);
    } catch (error) {
        res.status(500).json({message: error});
    }
};

const getGroupMembers = async (req, res) => {
    try {
        const group = await Group.findById(req.params.id);

        // If group doesn't exist
        if (!group) return res.status(404).json({message: "Group doesn't exist."});

        const members = await User.find({_id: {$in: group.members}});

        return res.json(members);
    } catch (error) {
        res.status(500).json({message: error});
    }
};


const joinGroup = async (req, res) => {
    try {
        let {accessCode, role} = req.body;
        // If accessCode is not provided
        if (!accessCode) return res.status(404).json({message: "Access code is required."});
        // go through all groups and find the one with the matching access code
        const group = await Group.findOne({accessCode: accessCode});
        // If group doesn't exist
        if (!group) return res.status(404).json({message: "Group doesn't exist."});
        // If user is already a member
        if (group.members.includes(req.user_id)) return res.status(404).json({message: "User is already a member."});
        // add user to group
        if (role === 'candidate') {
            group.candidates.push(req.user_id);
        }
        else {
            group.members.push(req.user_id);
        }

        await group.save();

        // add group to user
        const user = await User.findById(req.user_id);
        user.groups.push({
            group_id: group._id,
            traits: [], 
            role: role
        });
        await user.save();

    } catch (error) {
        res.status(500).json({message: error});
    }
};

const openai = require('openai');
const apiKey = 'sk-...zgTf';

const gainInsights = async(req,res) => {
    try {
        let {user_id, group_id} = req.body;
        const user = await User.findById(user_id);
        const group = await Group.findById(group_id);
        let userTraits = user.groups.filter(group => group.group_id == group_id)[0].traits;
        //create a map of candidates to their traits
        let candidateTraits = {};
        for (let candidate of group.candidates) {
            let candidateUser = await User.findById(candidate);
            candidateTraits[candidate] = candidateUser.groups.filter(group => group.group_id == group_id)[0].traits;
        }
        // pass in the user's traits and the candidates' traits to the openai api and get back a list of insights picking the candidate that best fits the user
        const prompt = "Given the following traits of a user and candidates, match the best candidate for the user and explain why:\n\nUser Traits: [user_traits]\nCandidates:\n1. [candidate_1_traits]\n2. [candidate_2_traits]\n3. [candidate_3_traits]";

        const response = await openai.Completion.create({
            engine: "davinci",  // Use the appropriate engine
            prompt,
            max_tokens: 100  // Adjust as needed
        });

        const explanation = response.choices[0].text;
        const bestCandidate = explanation.split(" ")[0];
        // return the best candidate and the explanation
        res.json({bestCandidate, explanation});

    } catch (error) {
        res.status(500).json({message: error});
    }
};


module.exports = {
    createGroup,
    getGroup,
    deleteGroup,
    addCandidate,
    removeCandidate,
    addMember,
    removeMember,
    getGroups,
    getGroupCandidates,
    getGroupMembers,
    joinGroup, 
    gainInsights
}