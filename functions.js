module.exports = {
    findMember: (message, toFind) => {
        let filter;
        let target;

        if (toFind) filter = message.guild.members.filter(member => member.user.tag.toLowerCase().includes(toFind.toLowerCase()) || member.id == toFind);

        if (!filter || filter.size < 1) target = message.mentions.members.first();
        else {
            if (filter.size > 1) target = filter.array();
            else target = filter.array()[0];
        }

        if (!target) target = message.member;
        return target;
    }
}