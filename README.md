# Jira Worklogger

This util allow you send auto work log reports to JIRA.

# How use it
Install the util.
```
npm jira-worklogger -g
```
Set jira-worklogger config with use command.
```
jwl-config
```
Open your project and run command
```
use-jwl
```
It will add git hooks to your project that to keep track of commits and branch switches.

Switch you git branch to master and create you task branch by template.
```
git branch type/jira-task-name
```

For example:
```
git branch feature/jwl-208
```
where jwl-208 task in yout JIRA system.

Time will be track between your commits.

After work use Сtrl + C for end and wait while util will create work reports for you.
