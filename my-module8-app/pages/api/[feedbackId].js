import { buildFeedback , extractFeedback} from './feedback'

function handler(req,res) {
    const feedbackId = req.query.feedbackId;
    const filePath = buildFeedback();
    const feedbackData = extractFeedback (filePath)
    const selectedFeebackData = feedbackData.find(feedback => feedback.id === feedbackId);
    res.status(200).json({feedback : selectedFeebackData});
}
export default handler