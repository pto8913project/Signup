import { Octokit } from "https://cdn.skypack.dev/@octokit/rest";

// https://docs.github.com/en/rest/teams/members?apiVersion=2022-11-28
//   await octokit.request(
//     'PUT /orgs/{org}/teams/{team_slug}/memberships/{username}', 
//     {
//       org: 'pto8913project',
//       team_slug: "read",
//       username: user,
//       role: 'member',
//       headers: {
//         'X-GitHub-Api-Version': '2022-11-28'
//       }
//     }
//   ).catch(err, ()=> {
//   });
// };

// https://docs.github.com/en/rest/orgs/members?apiVersion=2022-11-28
async function SignupToOrg(in_token, email)
{
  const octokit = new Octokit({
    auth: in_token
  })
  if (!in_token)
  {
    alert('tokenを入力してください');
    return;
  }
  // Octokit.js
  // https://github.com/octokit/core.js#readme

  if (!email)
  {
    alert('emailを入力してください');
    return;
  }

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