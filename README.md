# vanity-eth
Node.js ETH vanity address generator

## Usage

clone from github

```bash
$ git clone https://github.com/aix-t/vanity-eth.git
```
Install dependencies

```bash
$ npm install
```
Run

```bash
$ node eth.js
```

The output will be written to output.txt.

## Using PM2
Install PM2

```bash
$ npm install pm2 -g
```
Starting a Node.js application in cluster mode that will leverage all CPUs available:

```bash
$ pm2 start eth.js -i <processes>
```
`<processes>` can be `'max'`, `-1` (all cpu minus 1) or a specified number of instances to start.

## Explanation of Config Parameters

| Parameter | Description                                       |
| --------- | ------------------------------------------------- |
| count     | The number of times to generate                   |
| isCase    | Whether the address is case sensitive or not      |
| regArr    | An array of regular expressions for matching rules|
| prefix    | How many characters to match at the beginning     |
| suffix    | How many characters to match at the end           |
| logical   | Whether it should match both prefix and suffix or any one of them |
