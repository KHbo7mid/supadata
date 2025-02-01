import { useState, useEffect } from "react";
import { Select, MenuItem, FormControl, InputLabel, FormHelperText } from '@mui/material';
import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";
import itLocale from "i18n-iso-countries/langs/it.json";

export default function SelectCountry({ label, value, onChange, error }) {
    const [selectedCountry, setSelectedCountry] = useState(value || { key: '', label: '' });

    // Register locales and get country data
    useEffect(() => {
        countries.registerLocale(enLocale);
        countries.registerLocale(itLocale);
    }, []);

    // Get country names mapped to ISO codes
    const countryObj = countries.getNames('en', { select: 'official' });
    const countryArr = Object.entries(countryObj).map(([key, value]) => ({
        label: value,
        key: key // Use ISO codes as keys
    }));

    // Handle change event
    const handleChange = (e) => {
        const selectedKey = e.target.value;
        const selectedLabel = countryObj[selectedKey] || '';
        const newSelectedCountry = { key: selectedKey, label: selectedLabel };
        setSelectedCountry(newSelectedCountry);
        onChange(newSelectedCountry); // Pass the selected country object
    };

    return (
        <FormControl variant="outlined" error={!!error}>
            {label && <InputLabel>{label}</InputLabel>}
            <Select
                value={selectedCountry.key || ''}
                onChange={handleChange}
                label={label}
                style={{ width: "240px" }}
            >
                {countryArr.map(({ label, key }) => (
                    <MenuItem key={key} value={key}>
                        {label}
                    </MenuItem>
                ))}
            </Select>
            {error && <FormHelperText>{typeof error === 'string' ? error : 'An error occurred'}</FormHelperText>}
        </FormControl>
    );
}
