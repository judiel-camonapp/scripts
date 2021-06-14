local trigger1 = app.history:hasExperience("10d7ea76b0ac4c6e807bb17b746554c0_18030") or app.history:hasExperience("10d7ea76b0ac4c6e807bb17b746554c0_18102") or app.history:hasExperience("10d7ea76b0ac4c6e807bb17b746554c0_18104") or app.history:hasExperience("10d7ea76b0ac4c6e807bb17b746554c0_18105")

local trigger2 = app.history:hasExperience("6311e64eada6480a8a17ccaa85c34337_18067") or app.history:hasExperience("6311e64eada6480a8a17ccaa85c34337_18120") or app.history:hasExperience("6311e64eada6480a8a17ccaa85c34337_18121") or app.history:hasExperience("6311e64eada6480a8a17ccaa85c34337_18122")

local trigger3 = app.history:hasExperience("1a1786d189ef435286313fc3be1d6404_18066") or app.history:hasExperience("1a1786d189ef435286313fc3be1d6404_18117") or app.history:hasExperience("1a1786d189ef435286313fc3be1d6404_18118") or app.history:hasExperience("1a1786d189ef435286313fc3be1d6404_18119")

local trigger4 = app.history:hasExperience("bfa486fa2a6047bbb36c83ac48db41fa_18065") or app.history:hasExperience("bfa486fa2a6047bbb36c83ac48db41fa_18110") or app.history:hasExperience("bfa486fa2a6047bbb36c83ac48db41fa_18111") or app.history:hasExperience("bfa486fa2a6047bbb36c83ac48db41fa_18112")

local trigger5 = app.history:hasExperience("54e01aa675b64bb197294e633b023a77_18064") or app.history:hasExperience("54e01aa675b64bb197294e633b023a77_18114") or app.history:hasExperience("54e01aa675b64bb197294e633b023a77_18115") or app.history:hasExperience("54e01aa675b64bb197294e633b023a77_18116")

local trigger6 = app.history:hasExperience("4ad18de74af84988b6432e102b5935c6_18068") or app.history:hasExperience("4ad18de74af84988b6432e102b5935c6_18124") or app.history:hasExperience("4ad18de74af84988b6432e102b5935c6_18125") or app.history:hasExperience("4ad18de74af84988b6432e102b5935c6_18126")

if trigger1 and trigger2 and trigger3 and trigger4 and trigger5 and trigger6 then
	experience:transitionToScene("Gallery_Complete", "none", 0)
else 
	if trigger1 then
		this:shapeByName("Trigger_1_OFF"):hide()
	else
		this:shapeByName("Trigger_1_ON"):hide()
	end

	if trigger2 then
		this:shapeByName("Trigger_2_OFF"):hide()
	else
		this:shapeByName("Trigger_2_ON"):hide()
	end

	if trigger3 then
		this:shapeByName("Trigger_3_OFF"):hide()
	else
		this:shapeByName("Trigger_3_ON"):hide()
	end

	if trigger4 then
		this:shapeByName("Trigger_4_OFF"):hide()
	else
		this:shapeByName("Trigger_4_ON"):hide()
	end

	if trigger5 then
		this:shapeByName("Trigger_5_OFF"):hide()
	else
		this:shapeByName("Trigger_5_ON"):hide()
	end

	if trigger6 then
		this:shapeByName("Trigger_6_OFF"):hide()
	else
		this:shapeByName("Trigger_6_ON"):hide()
	end
end