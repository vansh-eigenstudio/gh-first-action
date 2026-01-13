const core = require('@actions/core');
const exec = require('@actions/exec');

async function run() {
    // Get inputs defined in action.yml file
    const bucket = core.getInput('bucket', { required: true });
    const bucketRegion = core.getInput('bucket-region', { required: true });
    const distFolder = core.getInput('dist-folder', { required: true });
    //Upload the files to s3 bucket
    const s3uri= `s3://${bucket}/`
    exec.exec(`aws s3 sync ${distFolder} ${s3uri} --region ${bucketRegion}`)

    const websiteUrl = `http://${bucket}.s3-website.${bucketRegion}.amazonaws.com`;
    core.setOutput('deploy-url', websiteUrl);
}
run();