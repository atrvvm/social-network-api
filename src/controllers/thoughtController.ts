import { Request, Response } from 'express';
import { Thought, User } from '../models/index.js';

// GET all thoughts
export const getThoughts = async (_req: Request, res: Response) => {
  try {
    const dbThoughtData = await Thought.find()
      .sort({ createdAt: -1 });

    return res.json(dbThoughtData);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
}
// GET single thought by id
export const getSingleThought = async (req: Request, res: Response) => {
  try {
    const dbThoughtData = await Thought.findOne({ _id: req.params.thoughtId });

    if (!dbThoughtData) {
      return res.status(404).json({ message: 'No thought with this id!' });
    }

    return res.json(dbThoughtData);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
}
  // CREATE new thought
  export const createThought = async(req: Request, res: Response) => {
    try {
      const dbThoughtData = await Thought.create(req.body);

      const dbUserData = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $push: { thoughts: dbThoughtData._id } },
        { new: true }
      );

      if (!dbUserData) {
        return res.status(404).json({ message: 'Thought created but no user with this id!' });
      }

      return res.json({ message: 'Thought successfully created!' });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  }
    // UPDATE thought
    export const updateThought = async(req: Request, res: Response) => {
  try {
    const dbThoughtData = await Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $set: req.body }, { runValidators: true, new: true });

    if (!dbThoughtData) {
      return res.status(404).json({ message: 'No thought with this id!' });
    }

    return res.json(dbThoughtData);
  } catch (err: any) {
    console.log(err);
    return res.status(500).json(err);
  }
}
 // DELETE thought
 export const deleteThought = async(req: Request, res: Response) => {
  try {
    const dbThoughtData = await Thought.findOneAndDelete({ _id: req.params.thoughtId })

    if (!dbThoughtData) {
      return res.status(404).json({ message: 'No thought with this id!' });
    }

    // REMOVE thought id from user's `thoughts` field
    const dbUserData = User.findOneAndUpdate(
      { thoughts: req.params.thoughtId },
      { $pull: { thoughts: req.params.thoughtId } },
      { new: true }
    );

    if (!dbUserData) {
      return res.status(404).json({ message: 'Thought created but no user with this id!' });
    }

    return res.json({ message: 'Thought successfully deleted!' });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
}

 // ADD a reaction to a thought
 export const addReaction = async(req: Request, res: Response) => {
  try {
    const dbThoughtData = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    );

    if (!dbThoughtData) {
      return res.status(404).json({ message: 'No thought with this id!' });
    }

    return res.json(dbThoughtData);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
}
 // REMOVE reaction from a thought
 export const removeReaction = async(req: Request, res: Response) => {
  try {
    const dbThoughtData = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    );

    if (!dbThoughtData) {
      return res.status(404).json({ message: 'No thought with this id!' });
    }

    return res.json(dbThoughtData);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};
