using Blog.Domain;
using Blog.Domain.Exceptions;
using Blog.Domain.SearchCriterias;
using Blog.IDataAccess;
using Blog.IServices;

namespace Blog.Services;

public class RoleService : IRoleService
{
    private readonly IRoleRepository _repository;

    public RoleService(IRoleRepository repository)
    {
        _repository = repository;
    }


    public List<Role> GetAllRoles()
    {
        return _repository.GetAllRoles();
    }


    public Role GetSpecificRole(int value)
    {
        var roleSaved = _repository.GetOneBy(r => (int)r.RoleType == value);

        if (roleSaved == null)
            throw new ResourceNotFoundException($"Could not find specified Role {value}");

        return roleSaved;
    }

    /*
    public Role CreateRole(Role role)
    {
        //Role.ValidOrFail();
        _repository.Insert(role);
        _repository.Save();
        return role;
    }

    public Role UpdateRole(int id, Role updatedRole)
    {
        //updatedRole.ValidOrFail();
        var roleSaved = _repository.GetOneBy(r => r.Id == id);

        if (roleSaved == null)
            throw new ResourceNotFoundException($"Could not find specified Role {id}");

        roleSaved.UpdateAttributes(updatedRole);
        _repository.Update(roleSaved);
        _repository.Save();

        return roleSaved;
    }

    public void DeleteRole(int id)
    {
        var roleSaved = _repository.GetOneBy(r => r.Id == id);

        if (roleSaved == null)
            throw new ResourceNotFoundException($"Could not find specified Role {id}");

        _repository.Delete(roleSaved);
        _repository.Save();
    }
    */
}



