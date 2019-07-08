import { pExec } from './exec';

export async function parseBranch(): Promise<string[]> {
    const out = await pExec('git branch');
    let branches = out.split('\n');
    branches = branches.map(b => {
        let br = b.replace('*', '');
        br = br.trimLeft();
        return br;
    });
    branches = branches.filter(b => {
        if (!b) {
            return false;
        }
        return true;
    });
    return branches;
}

export async function currentBranch(): Promise<string> {
    const out = await pExec('git branch');
    let branches = out.split('\n');
    const regExp = new RegExp(/\*/);
    let curBranch = branches.find(b => regExp.test(b));
    curBranch = curBranch.replace('*', '');
    curBranch = curBranch.trimLeft();
    return curBranch;
}
