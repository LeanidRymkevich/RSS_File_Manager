# RSS_File_Manager

This is an implementation of the [RSS File Manager task](https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/file-manager/assignment.md). Here, in Readme.md, explanations of some important moments of the app using will be presented. For the entire list of implemented commands, see the task [link](https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/file-manager/assignment.md).

## Launching the app

The program is started by npm-script `start` in following way:
```bash
npm run start -- --username=your_username
```
where after `=` all you entered will become a username (parts separated by spaces will be concatenated with spaces).

Then you will see a welcome message and an invitation to enter a command from the task list with displaying your current working directory after completing each command.
Here is an example:

![image](https://github.com/LeanidRymkevich/RSS_File_Manager/assets/83360315/93008256-8be3-4d22-84d4-f697a19db452)

After 'Please enter next command >' you can write your command and press 'Enter' to execute.

## Command arguments

Must be written separated by spaces after a command name. Where it is necessary accordingly to the task, flags for a command must be provided using `--` before flag name as below

![image](https://github.com/LeanidRymkevich/RSS_File_Manager/assets/83360315/0630e523-e4aa-4baf-8924-e52e7b8e4406)

Paths may be absolute or relative to the current working directiory. Paths shouldn't contain following chars: `'*', '?', ':', '"', '<', '>', '|'` and depending on the OS - `'/'` or `'\'` (`:` is allowed for 
root on Windows). Path including spaces must be enclosed in double quotes. For particular OS you must use appropriate path separator - `'\'` for Windows and `'/'` for others. See an example below:

![image](https://github.com/LeanidRymkevich/RSS_File_Manager/assets/83360315/2f496927-86fb-4fdb-9ac1-2096652f391e)

## A couple of words about some command implementation

- when using the `ls`-command all files and folder are showing, including hidden and system ones
- when using the `cp`-command with the path to the destination folder equal to the path to the source file folder, you'll receive only one file copy with name `fileName-copy` in source folder, no matter how many times you'll repeat previous copy-command
- when using the `rn`-command in `new_filename` argument you should provide the extention too, in case you want renamed file has an extention
- when using the `compress` or `decompress`-commands in `path_to_destination` argument you should provide the extention too, in case you want compressed/decompressed file has an extention
