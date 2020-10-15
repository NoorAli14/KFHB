Quick summary
========
* This checklist should be used to prepare the final release for GA (general availability) announcement.
* All items in this list **must** be completed unless approved by the architecture office prior to a specific release (such as in the case of a hotfix).

Checklist
========
* **Jira status**: All user stories included in the release should have the status as `DONE` in Jira.
* **Pull requests**: All PR's (pull requests) related to those user stories must be merged, ensuring that the code review has been completed.
* **Branch information**: The release will be prepared from the `master` branch, and hence, all changes should be merged with the `master` branch.
* **Tag name**: The release should be tagged. The convention being followed is `vMAJOR.MINOR.PATCH` (e.g., `v0.1.0`).
* **Docker images**: Azure pipelines should be executed and all Docker images should be made available on the Azure container registry.
* **Release notes**: Release notes should be prepared with the following minimal information:
  * Release information
    * Git commit id
    * Git tag name
    * Git branch used to create the release
    * Release date
  * Executive summary/ overview for the release
  * List of docker images included in the release with tag names
  * Software and hardware requirements for the release
  * Known issues and gaps
  * List of bugs (Jira id's) fixed
  * API documentation links