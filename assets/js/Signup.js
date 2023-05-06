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
  )  
};

async function SignupToOrg(in_token, user, email)
{
  // Octokit.js
  // https://github.com/octokit/core.js#readme
  const octokit = new Octokit({
    auth: in_token
  })
  // console.log(token);

  console.log(user);
  console.log(email);

  await octokit.request(
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
};

async function assignTeam(user, user_emailkit)
{
  const result = await octokit.request(
    "GET /orgs/{org}/members/{username}/",
    { 
      username: user,
      org: "pto8913project",
    }
  ).catch(
    async (err) => {
      if(err.status === 404)
      {
        console.log("user is not a team mamber but part of the org", err.status);
      }
    }
  );

  if (result)
  {
    if (result.status === 204)
    {

    }
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