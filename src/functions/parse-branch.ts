import { pExec } from './exec';

export async function parseBranch(): Promise<string[]> {
    const out = await pExec('git branch');
    let branches = out.split('\n');
    branches = branches.map(b => {
        let br = b.replace('*', '');
        br = br.trimLeft();
        return br;
    });
    branches = branches.filter((b, i) => {
        if (!b) {
            return false;
        }
        return true;
    });
    return branches;
}
