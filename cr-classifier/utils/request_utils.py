def get_float_value(string_value, default_value=None):
    if string_value is None:
        return default_value

    try:
        result = float(string_value)
    except TypeError:
        result = default_value

    return result


def get_int_value(string_value, default_value=None):
    if string_value is None:
        return default_value

    try:
        result = int(string_value)
    except TypeError:
        result = default_value

    return result
