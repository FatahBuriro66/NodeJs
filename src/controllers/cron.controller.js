const cronManager = require("../jobs/inedx")

const startJob = async (req, res) => {
    try {
        const { jobName } = req.body
        const job = cronManager.get(jobName)
        if (!job) {
            return res.status(404).json({ success: false, message: 'job not found', data: null })
        }

        job.start()
        return res.status(200).json({ success: true, message: 'Success', data: null })
    } catch (error) {
        console.log(error)
    }
}

const stopJob = async (req, res) => {
    try {
        const { jobName } = req.body
        const job = cronManager
        return
    } catch (error) {

    }
}

module.exports = {
    startJob,
    stopJob
}