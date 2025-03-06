interface PermissionsBadgesProps {
   
}

const permissionTranslations: Record<string, string> = {
  "task:create": "tarefa:criar",
  "task:edit": "tarefa:editar",
  "task:delete": "tarefa:deletar",
  "task:view": "tarefa:visualizar",
  "team:manage": "time:gerenciar",
  "team:invite": "time:convidar",
  "team:remove": "time:remover",
  "team:view": "time:visualizar",
  "comment:create": "comentario:criar",
  "comment:edit": "comentario:editar",
  "comment:delete": "comentario:deletar",
  "comment:view": "comentario:visualizar",
};

type Permission = keyof typeof permissionTranslations;

function PermissionsBadges(permissions: Permission[]) {
  const categorizedPermissions: Record<string, string[]> = {};

  // Agrupa permissões por categoria
  permissions.forEach((perm) => {
    const [category, action] = perm.split(":");
    if (!categorizedPermissions[category]) {
      categorizedPermissions[category] = [];
    }
    categorizedPermissions[category].push(action);
  });

  const badges: JSX.Element[] = [];

  Object.entries(categorizedPermissions).forEach(([category, actions]) => {
    const allActions = permissionsData[category as keyof typeof permissionsData];

    if (allActions && actions.length === allActions.length) {
      // Se todas as permissões da categoria estão presentes, adiciona um "tudo"
      badges.push(<Badge key={category}>{`${capitalize(category)}: Tudo`}</Badge>);
    } else {
      // Adiciona badges individuais
      actions.forEach((action) => {
        const key = `${category}:${action}`;
        if (permissionTranslations[key as Permission]) {
          badges.push(<Badge key={key}>{permissionTranslations[key as Permission]}</Badge>);
        }
      });
    }
  });

  return badges;
}