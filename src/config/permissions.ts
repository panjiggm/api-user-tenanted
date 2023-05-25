export const ALL_PERMISSIONS = [
  // users
  'users:roles:write', // Allowed to add a role to a user
  'users:roles:delete', // Allowed to remove a role from a user
  // posts
  'posts:write',
  'posts:read',
] as const;

export const PERMISSIONS = ALL_PERMISSIONS.reduce(
  (acc, permission) => {
    acc[permission] = permission;

    return acc;
  },
  {} as Record<
    (typeof ALL_PERMISSIONS)[number],
    (typeof ALL_PERMISSIONS)[number]
  >
);

export const USER_ROLE = [
  PERMISSIONS['posts:read'],
  PERMISSIONS['posts:write'],
];

export const SYSTEM_ROLE = {
  SUPER_ADMIN: 'SUPER_ADMIN',
  APPLICATION_USER: 'APPLICATION_USER',
};
