export default function() {
    return (
		<div className="inputCheckbox">
			<label for="termsAndConditions">Terms & Conditions</label>
			<input
				type="checkbox"
				name="termsAndConditions"
				id="termsAndConditions"
				value="termsAndConditions"
                required
			/>
		</div>
	);
}