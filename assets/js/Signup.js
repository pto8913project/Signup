import { Octokit } from "https://cdn.skypack.dev/@octokit/rest";
// Octokit.js
// https://github.com/octokit/core.js#readme

// add team member 
// https://docs.github.com/en/rest/teams/members?apiVersion=2022-11-28

// add org member
// https://docs.github.com/en/rest/orgs/members?apiVersion=2022-11-28
async function SignupToOrg(in_token, email)
{
  if (!in_token)
  {
    alert('tokenを入力してください');
    return;
  }
  if (!email)
  {
    alert('emailを入力してください');
    return;
  }

  const octokit = new Octokit({
    auth: in_token
  })
  const response = await octokit.request(
    'POST /orgs/{org}/invitations', 
    {
      org: 'pto8913project',
      email: email,
      role: 'direct_member',
      team_ids: [
        12,
        26
      ],
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      }
    }
  )
  if (response.status === 204)
  {
    alert("pto8913から{mail}に招待メールが送られました", {mail: email});
    return;
  }
  if (response.status === 401)
  {
    alert("tokenかemailが間違っています確認してください。\n tokenが間違っている場合はpto8913project@gmail.comにご連絡ください");
    return;
  }
};

const ToOrgButton = document.getElementById("ToOrg");
ToOrgButton.addEventListener(
  'click', 
  ()=> {
    var user_email = document.getElementsByName('user_email')[0].value;
    var in_token = document.getElementsByName('token')[0].value;
    SignupToOrg(in_token, user_email);
  }
);