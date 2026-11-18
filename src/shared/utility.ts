export const updateObject = <T extends object>(oldObject: T, updatedProperties: Partial<T>): T => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};
