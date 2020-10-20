# Quick summary
* Applicable Jira status for Aion Rubix project are
  * To Do - story/ task can be picked up by the assignee
  * In progress - assignee has started working on it
  * Code review - assignee has finished work and waiting for someone to review
  * Ready to deploy - for artifacts, this state indicates that they can be put onto a common location (such as a CIT server)
  * Done - all work has been completed by the team and a demo can be given
  * Closed - the story has been accepted to be complete
* For an example, please see the [Jira board](https://aiondigital.atlassian.net/jira/software/projects/APS/boards/14).

# Jira issue status details
Following are the definition of each state and associate actions/ transitions:

## To do
If a sprint has been started, this state indicates that the **story/ task can be picked up by the assignee**. The expected actions to be completed before this state are
* Story has got proper description and acceptance criteria.
* It has been reviewed with the team in a backlog grooming session.

As soon as the assignee picks up the story for work, it should be moved to the next state, which is "**In progress**".

## In progress
This indicates that the assignee is working on the story. Typical development related stories are expected to complete the following actions in this state:
* Low level design, analysis and code
* Unit testing
* Developer documentation (where applicable)
* Any other tasks required to be completed for meeting the acceptance criteria

As soon as the task is complete for review, it should transition to the next state, which is "**Code review**". For stories related to github repository changes, this means that a pull request has been created for merging the change.

## Code review
For most stories, this indicates that the pull request is available for review in github. As part of the review, the following action are expected to be performed by the reviewer:
* Review for consistency, completeness and NFR's (such as performance and security)
* Local testing or review of the changes by running the code (where applicable)

A state transition to "**Ready to deploy**" would only happen when all code review issues are handled and the pull request has been merged.

## Ready to deploy
For most stories, this indicates that the pull request has been merged with the `develop` branch. As part of next step, it needs to be deployed (either via automation or manually). For other types of artifacts, this indicates that the artifact is ready to be put in a known/ published location for end users to see.

Summary of actions in this state are
* Code/ artifact is deployed/ published
* Sanity testing of the published artifact is performed

A state transition to "**Done**" would only happen when the sanity test has been performed.

## Done
This state indicates that all work has been completed as per the team working on it. Actions expected in this state are
* Demo to be given the scrum team
* Review by the approving authority

A state transition to "Closed" would only happen when the user story is agreed to have met the "**Definition of done**". As of now, the "definition of done" is the list of actions described in this standard.

## Closed
This is the final state, and it indicates that the user story has been agreed to be complete. Any further work should result in a new story being created rather than reopening this story.