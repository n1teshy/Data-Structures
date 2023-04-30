// Note: do not use this for anything serious

class BloomFilter{
    constructor(){
        // Note: in real life scenarios, you would use a bitarray instead of a regular array
        this.record = Array(1000).fill(0);
    }

    add(value){
        const hashes = this.getHashes(value, this.record.length);
        hashes.forEach((index) => {
            this.record[index] = 1;
        });
    }

    has(value){
        const hashes = this.getHashes(value, this.record.length);
        return hashes.every((index) => this.record[index] === 1);
    }

    getHashes(value, limit){
        function hash1(value, limit){
            let sum = 0;
            for(let i = 0; i < value.length; i++){
                sum += (value.charCodeAt(i) + (7 * (i + 1)))
            }
            return sum % limit;
        }
        
        function hash2(value, limit){
            let sum = 0;
            for(let i = 0; i < value.length; i++){
                sum += Math.sqrt(value.charCodeAt(i));
            }
            return Math.floor(sum % limit);
        }
        
        const firstHash = hash1(value, limit);
        const secondHash = hash2(value, limit);
        return [firstHash, secondHash, ((firstHash % secondHash) % limit)];
    }
}

const filter = new BloomFilter();

for(let i = 0; i < 1000; i++){
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const string1 = Array(Math.floor(Math.random() * 50)).fill(0).map(() => chars[Math.floor(Math.random() * chars.length)]).join("");
    filter.add(string1);
    if(!filter.has(string1)){
        console.log(string1);
    }
}
