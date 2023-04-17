using Blog.Domain;

namespace Models.Out;

public class RoleModelOut
{
    public List<int> roles {get;set;}

    public RoleModelOut(List<Role> entityRoles)
    {
        roles = new List<int>();

        foreach (var r in entityRoles)
        {
            roles.Add((int)r.RoleType);
        }

    }

}
