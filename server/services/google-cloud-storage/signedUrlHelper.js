const projectId = 'zuru-internal';
const gcs = require('@google-cloud/storage')({
    projectId,
    keyFilename: './services/google-cloud-storage/Zuru_Internal.json',
});
const config = require('../../config.json');

module.exports = {
    getPictureUrls: async (req, res) => {
        try {
            const _bucket = gcs.bucket('zuru-resumes');
            let mTimestamp = new Date().getTime();

            const file = _bucket.file(`profile/${mTimestamp}.png`)
            const publicLink = `http://storage.googleapis.com/zuru-resumes/profile/${mTimestamp}.png`;
            file.createResumableUpload({
            }, (err, uri) => {
                if (err) throw err;
                console.log(uri);
                res.json({uri,publicLink})
            })
        }
        catch (err) {
            throw err;
        }
    },
    getResumeUrls: async (req, res) => {
        try {
            const bucket = gcs.bucket('zuru-resumes');
            const mTimestamp = new Date().getTime();

            const file = bucket.file(`resume/${mTimestamp}.pdf`);
            const publicLink = `http://storage.googleapis.com/zuru-resumes/resume/${mTimestamp}.pdf`;
            file.createResumableUpload({
            }, (err, uri) => {
                if (err) throw err;
                console.log(uri);
                res.json({ uri, publicLink})
            });
        } catch (err) {
            throw err;
        }
    },
}