import { Octokit } from "https://cdn.skypack.dev/@octokit/rest";

const ORG = "pto8913project";
const OctHeader = { 'X-GitHub-Api-Version': '2022-11-28' };

// Octokit.js
// https://github.com/octokit/core.js#readme

// add team member 
// https://docs.github.com/en/rest/teams/members?apiVersion=2022-11-28

// add org member
// https://docs.github.com/en/rest/orgs/members?apiVersion=2022-11-28
async function SignupToOrg(in_token, user, email)
{
  if (!in_token)
  {
    alert('tokenを入力してください');
    return;
  }
  if (!user)
  {
    alert('github idを入力してください');
    return;
  }
  if (!email)
  {
    alert('emailを入力してください');
    return;
  }

  const octokit = new Octokit({ auth: in_token })

  const isMember = IsMember(octokit, user);
  console.log("member ? " + isMember === true);
  if (isMember === true)
  {
    alert(user + ' : はすでに登録されています');
    return;
  }
  const isPending = IsPending(octokit, email);
  console.log("pending ? " + isPending === true);
  if (isPending === true)
  {
    alert("すでに送信済みですメール" + email + "を確認してください。");
    return;
  }
  
  const response = await octokit.request(
    'POST /orgs/{org}/invitations', 
    {
      org: ORG,
      email: email,
      role: 'direct_member',
      team_ids: [ 12, 26 ],
      headers: OctHeader
    }
  )
  if (response.status === 201)
  {
    alert("pto8913から " + email + " に招待メールが送られました。確認してください");
    return;
  }
  else if (response.status === 401)
  {
    alert("tokenかemailが間違っています確認してください。\n tokenが間違っている場合はpto8913project@gmail.comにご連絡ください");
    return;
  }
};

async function IsMember(octokit, user)
{
  const members = await octokit.request(
    'GET /orgs/{org}/members', 
    { org: ORG, headers: OctHeader }
  )

  for (const member of members.data)
  {
    // console.log("----- Is Member -----");
    // console.log(member);
    // console.log(member.name);
    // console.log(member.email);
    // console.log(member.login);
    // console.log("----- Is Member -----");

    if (member.login === user)
    {
      console.log(member.login + " === " + user + member.login === user);
      console.log((member.login === user) === true);
      return true;
    }
  }
  return false;
}

async function IsPending(octokit, email)
{
  const members = await octokit.request(
    'GET /orgs/{org}/invitations', 
    { org: ORG, headers: OctHeader }
  );

  for (const member of members.data)
  {
    // console.log("----- Is Pending -----");
    // console.log(member);
    // console.log(member.name);
    // console.log(member.email);
    // console.log(member.login);
    // console.log("----- Is Pending -----");

    if (member.email === email)
    {
      console.log(member.email + " === " + email + member.email === email);
      console.log((member.email === email) === true);
      return true;
    }
  }
  return false;
}

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