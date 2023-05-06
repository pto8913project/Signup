import { Octokit } from "https://cdn.skypack.dev/@octokit/rest";
// import { token } from "https://pto8913project.github.io/Signup/assets/js/ignore/config.js";

async function SignupToTeam(in_token, user, email)
{
  console.log(user);
  console.log(email);

  const octokit = new Octokit(
    {
      auth: in_token
    }
  );

  await octokit.request(
    'PUT /orgs/{org}/teams/{team_slug}/memberships/{username}', 
    {
      org: 'pto8913project',
      team_slug: "read",
      username: user,
      role: 'member',
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      }
    }
  ).catch(err, ()=> {

  });
};

async function SignupToOrg(in_token, user, email)
{
  if (!in_token)
  {
    const octokit = new Octokit({
      auth: in_token
    })
  }
  // Octokit.js
  // https://github.com/octokit/core.js#readme

  if (!email)
  {
    alert('emailを入力してください');
    return;
  }

  console.log(email);

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
    var user_name = document.getElementsByName('user_name')[0].value;
    var user_email = document.getElementsByName('user_email')[0].value;
    var in_token = document.getElementsByName('token')[0].value;
    SignupToOrg(in_token, user_name, user_email);
  }
);

const ToTeamButton = document.getElementById("ToTeam");

ToTeamButton.addEventListener(
  'click', 
  ()=> {
    var user_name = document.getElementsByName('user_name')[0].value;
    var user_email = document.getElementsByName('user_email')[0].value;
    var in_token = document.getElementsByName('token')[0].value;
    SignupToTeam(in_token, user_name, user_email);
  }
);
// console.log(token);