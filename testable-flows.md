| Scenario        | Expected Result           | 
| ------------- | ------------- | 
| Enter valid GitHub user name with no repos(emptyrepo)     | Success Message should be displayed above input form title and No repos text should be displayed on the output area | 
| Enter invalid GitHub username      | GitHub user not found message should be displayed above input form title and No repos text should be displayed on the output area      | 
| Enter valid GitHub user with repos available(hebercardona) | Success Message should be displayed, List of repos should be displayed on the output area      |  
| Enter valid GitHub user with multiple repos available(hebercardona) and verify repo amount heading     | Success Message should be displayed, Found {amount} repos should match the repos list displayed items |
| Enter GitHub user with repos with description | Repo Description should be Displayed(here we can also check if there is any limitation on very long descriptions or if there is an anchor on any description value so we can test the navigation) |
| Enter GitHub user with repos with no description | Description field should display a dash |
| Verify search can be done via Go button | Results should be displayed as per the input provided |
| Verify search can be done via Enter key | Results should be displayed as per the input provided |
| Verify repo name clicking redirect clicking on repo name | On clicking repo name it should redirect to Github actual repository |
| Verify no duplicates are present on the list | Repo list should match GitHub user repositories |
