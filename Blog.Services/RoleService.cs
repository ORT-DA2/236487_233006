using Blog.Domain;
using Blog.IDataAccess;
using Blog.IServices;

namespace Blog.Services;

public class RoleService : IRoleService
{
    private readonly IRepository<Role> _repository;

    public RoleService(IRepository<Role> repository)
    {
        _repository = repository;
    }
    /*

    public List<Role> GetAllRoles(RoleSearchCriteria searchCriteria)
    {
        return _userRoleRepository.GetAllBy(searchCriteria.Criteria()).ToList();
    }

    public Role GetSpecificRole(int id)
    {
        var RoleSaved = _repository.GetOneBy(m => m.Id == id);

        if (RoleSaved == null)
            throw new ResourceNotFoundException($"Could not find specified Role {id}");

        return RoleSaved;
    }

    public Role CreateRole(Role Role)
    {
        Role.ValidOrFail();
        _repository.Insert(Role);
        _repository.Save();
        return Role;
    }

    public Role UpdateRole(int id, Role updatedRole)
    {
        updatedRole.ValidOrFail();
        var RoleSaved = _repository.GetOneBy(m => m.Id == id);

        if (RoleSaved == null)
            throw new ResourceNotFoundException($"Could not find specified Role {id}");

        RoleSaved.UpdateAttributes(updatedRole);
        _repository.Update(RoleSaved);
        _repository.Save();

        return RoleSaved;
    }

    public void DeleteRole(int id)
    {
        var RoleSaved = _repository.GetOneBy(m => m.Id == id);

        if (RoleSaved == null)
            throw new ResourceNotFoundException($"Could not find specified Role {id}");

        _repository.Delete(RoleSaved);
        _repository.Save();
    }
}
*/
}

